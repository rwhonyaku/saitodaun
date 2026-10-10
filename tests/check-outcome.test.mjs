import test from "node:test";
import assert from "node:assert/strict";
import { classifyHttpResponse, classifyProbeError } from "../lib/checkOutcome.mjs";

test("distinguishes successful, reachable HTTP-error, and blocked responses", () => {
  assert.deepEqual(classifyHttpResponse(200), { outcome: "success", reachable: true, online: true, probeBlocked: false });
  assert.deepEqual(classifyHttpResponse(404), { outcome: "http_error", reachable: true, online: false, probeBlocked: false });
  assert.deepEqual(classifyHttpResponse(503), { outcome: "http_error", reachable: true, online: false, probeBlocked: false });
  assert.deepEqual(classifyHttpResponse(403), { outcome: "blocked", reachable: true, online: false, probeBlocked: true });
});

test("classifies actionable connection failures without exposing raw errors", () => {
  assert.equal(classifyProbeError(Object.assign(new Error("getaddrinfo ENOTFOUND example.invalid"), { code: "ENOTFOUND" })), "dns");
  assert.equal(classifyProbeError(new Error("certificate has expired")), "tls");
  assert.equal(classifyProbeError(new Error("The operation timed out")), "timeout");
  assert.equal(classifyProbeError(new Error("Too many redirects")), "redirect_loop");
});
