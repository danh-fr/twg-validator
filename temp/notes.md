mutation {
bulkOperationRunMutation(
mutation: "mutation CollectionCreate($input: CollectionInput!) { collectionCreate(input: $input) { collection { title ruleSet { appliedDisjunctively rules { column relation condition } } } userErrors { field, message } } }",
stagedUploadPath: "tmp/61239066816/bulk/98cf893a-c024-4831-a3b1-104b1cfc7632/collections") {
bulkOperation {
id
url
status
}
userErrors {
message
field
}
}
}

{ "input": { "title": "Product: Berber Tote", "ruleSet": { "appliedDisjunctively": true, "rules": { "column": "TITLE", "condition": "Berber Tote", "relation": "STARTS_WITH" } } } }

mutation CollectionCreate($input: CollectionInput!) { collectionCreate(input: $input) { collection { title ruleSet { appliedDisjunctively rules { column relation condition } } } userErrors { field, message } } }

{
"data": {
"bulkOperationRunMutation": {
"bulkOperation": {
"id": "gid://shopify/BulkOperation/965446467776",
"url": null,
"status": "CREATED"
},
"userErrors": []
}
},
"extensions": {
"cost": {
"requestedQueryCost": 10,
"actualQueryCost": 10,
"throttleStatus": {
"maximumAvailable": 1000,
"currentlyAvailable": 990,
"restoreRate": 50
}
}
}
}
