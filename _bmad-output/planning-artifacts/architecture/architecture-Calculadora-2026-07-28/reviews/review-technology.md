# Technology Sign-off Review

Date: 2026-07-28  
Reviewed document: `../ARCHITECTURE-SPINE.md`

## Verdict

**APPROVED.** No blocking technology findings remain.

## Blocking Findings

None.

## Sign-off Basis

- AD-9 now requires `npm ci` followed by `npx playwright install --with-deps chromium firefox webkit` on a clean machine before browser gates. This matches Playwright's required separation between installing the Node package and provisioning version-matched browser binaries plus system dependencies.
- The Playwright endpoint remains coherent: `test:browser` builds first, `webServer` serves that `dist/` through Vite preview on strict `127.0.0.1:4173`, and `baseURL` targets the same endpoint.
- AD-10 closes the dirty-worktree identity collision. `version.json` records `commit`, `dirty`, and a deterministic SHA-256 `sourceDigest` over the runtime and build inputs, ordered by path and bytes; rollback references that digest rather than commit alone.
- Node.js 24.18.0, npm 11.16.0, Vite 8.1.5, Vitest 4.1.10, and Playwright Test 1.62.0 remain real, supported, and mutually compatible.
- Relative Vite output, browser targets, real-browser certification, assistive-technology evidence, and hosting ownership remain correctly specified.

## Sources

- [Playwright: Setting up CI](https://playwright.dev/docs/ci-intro)
- [Playwright: Install browsers](https://playwright.dev/docs/browsers#install-browsers)
- [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci)
- [Vite: Build Options](https://vite.dev/config/build-options.html)
