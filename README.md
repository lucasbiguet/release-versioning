# Simple release versioning

Action for generating version based on last version tag. This is a simple version bump for those who don't need full semantic versioning.

eg: if tag `v7` is found -> output `v8` is generated

If no `v[number]` tag is found, then it returns `v1`

## Setup

```yaml
  steps:
      ...
      - name: Increment version from repository's tags
        id: tages_versioning
        uses: lucasbiguet/release-versioning@v1
        with:
          repo-token: ${{secrets.GITHUB_TOKEN}}
      ...
```

## Output variables:

**${{ steps.version.outputs.last }}** = *last found version* \
**${{ steps.version.outputs.next }}** = *next generated version*
