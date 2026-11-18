# sensei-support
A simple page to provide support for the Sensei app (iOS and Android), including its privacy policy.

## Pages

- `index.html`: the app, the store links, support and the privacy policy (the URL given to the App Store and Google Play: keep it at the root).
- `news.html`: the release notes, read from `whats-new.json`.
- `assets/site.css`, `assets/site.js`: the look and the FR / EN switch.

## Release notes

`whats-new.json` is a copy of the app's `Sensei/whats_new.json` at the release tag. At each release, copy it again:

    git -C ../Sensei show vX.Y.Z:Sensei/whats_new.json > whats-new.json

