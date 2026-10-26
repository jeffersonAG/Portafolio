import test from 'node:test';
import assert from 'node:assert/strict';
import { ContactError, sendContactMessage } from '../src/services/contact.js';

const fields = { name: ' Ana ', email: ' ana@example.com ', message: ' Consulta del proyecto ' };

test('sends the existing EmailJS contract and trims user fields', async () => {
  let request;
  const result = await sendContactMessage(fields, {
    fetchImpl: async (url, options) => {
      request = { url, options };
      return new Response('OK', { status: 200 });
    },
  });
  assert.equal(result.status, 200);
  assert.equal(request.url, 'https://api.emailjs.com/api/v1.0/email/send');
  assert.equal(request.options.method, 'POST');
  assert.equal(request.options.headers['Content-Type'], 'application/json');
  const body = JSON.parse(request.options.body);
  assert.equal(body.service_id, 'service_z9vbgm4');
  assert.equal(body.template_id, 'template_1s6v73e');
  assert.equal(body.user_id, '9IiEnFsf94JAoczav');
  assert.deepEqual(body.template_params, {
    name: 'Ana', email: 'ana@example.com', message: 'Consulta del proyecto',
    subject: 'Solicitud de contacto desde Portfolio V2',
  });
  assert.ok(request.options.signal instanceof AbortSignal);
  assert.equal('accessToken' in body, false);
});

for (const status of [400, 401, 403, 404, 412, 422, 429, 500]) {
  test(`preserves EmailJS HTTP ${status} and response details without reporting success`, async () => {
    let calls = 0;
    await assert.rejects(sendContactMessage(fields, {
      fetchImpl: async () => {
        calls += 1;
        return new Response(' Provider rejected the request\n', { status });
      },
    }), error => {
      assert.ok(error instanceof ContactError);
      assert.equal(error.status, status);
      assert.equal(error.details, 'Provider rejected the request');
      return true;
    });
    assert.equal(calls, 1, 'failed requests must not be retried automatically');
  });
}

test('reports a network failure separately from an HTTP rejection', async () => {
  await assert.rejects(sendContactMessage(fields, {
    fetchImpl: async () => { throw new TypeError('Failed to fetch'); },
  }), error => {
    assert.equal(error.status, 0);
    assert.match(error.message, /conectar/);
    assert.equal(error.details, 'Failed to fetch');
    return true;
  });
});

test('cancels a stalled request and clears the sending wait with no retry', async () => {
  let calls = 0;
  await assert.rejects(sendContactMessage(fields, {
    timeoutMs: 10,
    fetchImpl: (_url, { signal }) => {
      calls += 1;
      return new Promise((_resolve, reject) => {
        signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true });
      });
    },
  }), /tardó demasiado/);
  assert.equal(calls, 1);
});

test('rejects an empty message and local file origin before making a request', async () => {
  const fetchImpl = async () => assert.fail('must not send');
  await assert.rejects(sendContactMessage({ ...fields, message: '   ' }, { fetchImpl }), /Completa/);
  await assert.rejects(sendContactMessage(fields, { fetchImpl, protocol: 'file:' }), /dirección web/);
});
