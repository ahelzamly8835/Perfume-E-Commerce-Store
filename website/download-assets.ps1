$base = "d:\projact\digitera\digitera-bootcamp-1\website\public"

$files = @(
  @("https://www.figma.com/api/mcp/asset/00ed0182-1c31-4f04-9b06-db030ae7afd0.png", "$base\images\home\hero.png"),
  @("https://www.figma.com/api/mcp/asset/17f8ef3a-1746-449e-a41f-dad90e2d9dbc.png", "$base\images\home\trending-fleur-de-lune.png"),
  @("https://www.figma.com/api/mcp/asset/d61bcd09-0103-403d-afa0-ec7e96a33f5a.png", "$base\images\home\trending-santal-parchment.png"),
  @("https://www.figma.com/api/mcp/asset/cbade744-2276-42f7-8f52-28ea97039d8e.png", "$base\images\home\trending-sol-dor.png"),
  @("https://www.figma.com/api/mcp/asset/4bcdd989-2cdd-488b-b6a2-76dfcca60475.png", "$base\images\home\trending-noir-cocoon.png"),
  @("https://www.figma.com/api/mcp/asset/73d77ab0-3127-4df9-9b65-1ee95e03a40f.png", "$base\images\home\archetype-floral.png"),
  @("https://www.figma.com/api/mcp/asset/3de84de1-08ea-4a53-8566-c6da54b9254c.png", "$base\images\home\archetype-woody.png"),
  @("https://www.figma.com/api/mcp/asset/04c84022-277c-4f32-8cea-7c4bbb1704be.png", "$base\images\home\archetype-oriental.png"),
  @("https://www.figma.com/api/mcp/asset/b3f9d45d-667a-4305-9175-1712b72a1e99.png", "$base\images\home\archetype-fresh.png"),
  @("https://www.figma.com/api/mcp/asset/9cc0f5e8-3105-42c5-8eef-dc672125d94a.png", "$base\images\home\occasion-personal.png"),
  @("https://www.figma.com/api/mcp/asset/1790ce94-1029-440c-b8f2-8213a7f2d6ae.png", "$base\images\home\occasion-wedding.png"),
  @("https://www.figma.com/api/mcp/asset/d29d7bb8-6a3e-4fc2-8f94-7be54922ed8d.png", "$base\images\home\occasion-gift.png"),
  @("https://www.figma.com/api/mcp/asset/b5e3fa2d-d478-4744-a6c8-cd9f3fc10f33.png", "$base\images\home\occasion-birthday.png"),
  @("https://www.figma.com/api/mcp/asset/1f28168c-fb09-4d81-89a1-fb2bfdd00d3f.png", "$base\images\home\promo.png"),
  @("https://www.figma.com/api/mcp/asset/a59fb681-5cd8-4637-957a-ab89161f68c7.png", "$base\images\categories\floral.png"),
  @("https://www.figma.com/api/mcp/asset/83baf179-884e-4632-9a56-ed27efa15ec9.png", "$base\images\categories\woody.png"),
  @("https://www.figma.com/api/mcp/asset/49fdf838-918f-4048-86e3-4961db8ee43e.png", "$base\images\categories\oriental.png"),
  @("https://www.figma.com/api/mcp/asset/e937dddb-1a6f-4300-884f-597c35697ecc.png", "$base\images\categories\fresh.png"),
  @("https://www.figma.com/api/mcp/asset/833488f8-e71d-4ad5-bfcd-b3b5894de5c7.png", "$base\images\categories\private-reserve.png"),
  @("https://www.figma.com/api/mcp/asset/fb4a6e2c-865e-431f-82db-f82098793c13.png", "$base\images\categories\discovery-sets.png"),
  @("https://www.figma.com/api/mcp/asset/2327e0fb-0e42-40f8-ad29-5c7a67dd114c.png", "$base\images\categories\gifts-occasions.png")
)

foreach ($f in $files) {
  $url  = $f[0]
  $dest = $f[1]
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
    Write-Output "OK  $(Split-Path $dest -Leaf)"
  } catch {
    Write-Output "ERR $(Split-Path $dest -Leaf) -- $_"
  }
}
Write-Output "Done."
