import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Env } from "../types";
import { ok, err, resolveClient } from "./_helpers";

export function registerMiscTools(server: McpServer, env: Env) {
  // ========== ASSOCIATIONS ==========

  server.tool(
    "ghl_list_associations",
    "List associations.",
    {
      locationId: z.string().optional(),
      skip: z.string().optional(),
      limit: z.string().optional(),
    },
    async ({ locationId, skip, limit }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.listAssociations(locationId || client.locationId, skip, limit);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_association",
    "Get an association by ID.",
    {
      associationId: z.string(),
    },
    async ({ associationId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.getAssociation(associationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_association_by_key",
    "Get an association by key name.",
    {
      keyName: z.string(),
      locationId: z.string().optional(),
    },
    async ({ keyName, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.getAssociationByKey(keyName, locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_association",
    "Create an association.",
    {
      data: z.record(z.any()),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.createAssociation(data);
        return ok(`Association created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_association",
    "Update an association.",
    {
      associationId: z.string(),
      data: z.record(z.any()),
    },
    async ({ associationId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.updateAssociation(associationId, data);
        return ok(`Association updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_association",
    "Delete an association.",
    {
      associationId: z.string(),
    },
    async ({ associationId }) => {
      try {
        const client = await resolveClient(env);
        await client.misc.deleteAssociation(associationId);
        return ok(`Association ${associationId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== COMPANIES ==========

  server.tool(
    "ghl_list_companies",
    "List companies.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.listCompanies(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_company",
    "Get company details.",
    {
      companyId: z.string(),
    },
    async ({ companyId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.getCompany(companyId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_company",
    "Create a new company.",
    {
      data: z.record(z.any()),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.createCompany(data);
        return ok(`Company created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_company",
    "Update a company.",
    {
      companyId: z.string(),
      data: z.record(z.any()),
    },
    async ({ companyId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.updateCompany(companyId, data);
        return ok(`Company updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_company",
    "Delete a company.",
    {
      companyId: z.string(),
    },
    async ({ companyId }) => {
      try {
        const client = await resolveClient(env);
        await client.misc.deleteCompany(companyId);
        return ok(`Company ${companyId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== PHONE SYSTEM ==========

  server.tool(
    "ghl_list_number_pools",
    "List phone number pools.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.listNumberPools(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_list_active_numbers",
    "List active phone numbers for a location.",
    {
      locationId: z.string().optional(),
      pageSize: z.number().optional(),
      page: z.number().optional(),
      searchFilter: z.string().optional(),
    },
    async ({ locationId, pageSize, page, searchFilter }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.listActiveNumbers(locationId || client.locationId, { pageSize, page, searchFilter });
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_list_phone_numbers",
    "List phone numbers.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.listPhoneNumbers(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_phone_number",
    "Get a phone number by ID.",
    {
      phoneNumberId: z.string(),
    },
    async ({ phoneNumberId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.getPhoneNumber(phoneNumberId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_purchase_phone_number",
    "Purchase a phone number.",
    {
      data: z.record(z.any()),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.purchasePhoneNumber(data);
        return ok(`Phone number purchased!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_phone_number",
    "Update a phone number.",
    {
      phoneNumberId: z.string(),
      data: z.record(z.any()),
    },
    async ({ phoneNumberId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.updatePhoneNumber(phoneNumberId, data);
        return ok(`Phone number updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_release_phone_number",
    "Release a phone number.",
    {
      phoneNumberId: z.string(),
    },
    async ({ phoneNumberId }) => {
      try {
        const client = await resolveClient(env);
        await client.misc.releasePhoneNumber(phoneNumberId);
        return ok(`Phone number ${phoneNumberId} released.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== PRODUCTS ==========

  server.tool(
    "ghl_list_products",
    "List products for a location.",
    {
      locationId: z.string().optional(),
      limit: z.number().optional(),
      skip: z.number().optional(),
      status: z.string().optional(),
    },
    async ({ locationId, limit, skip, status }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.listProducts(locationId || client.locationId, { limit, skip, status });
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_product",
    "Get a product by ID.",
    {
      productId: z.string(),
    },
    async ({ productId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.getProduct(productId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_product",
    "Create a new product.",
    {
      data: z.record(z.any()),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.createProduct(data);
        return ok(`Product created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_product",
    "Update a product.",
    {
      productId: z.string(),
      data: z.record(z.any()),
    },
    async ({ productId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.updateProduct(productId, data);
        return ok(`Product updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_product",
    "Delete a product.",
    {
      productId: z.string(),
    },
    async ({ productId }) => {
      try {
        const client = await resolveClient(env);
        await client.misc.deleteProduct(productId);
        return ok(`Product ${productId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_product_price",
    "Delete a product price.",
    {
      productId: z.string(),
      priceId: z.string(),
    },
    async ({ productId, priceId }) => {
      try {
        const client = await resolveClient(env);
        await client.misc.deleteProductPrice(productId, priceId);
        return ok(`Product price ${priceId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_list_product_collections",
    "List product collections.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.listProductCollections(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_product_collection",
    "Create a product collection.",
    {
      body: z.record(z.any()),
    },
    async ({ body }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.createProductCollection(body);
        return ok(`Product collection created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_product_collection",
    "Delete a product collection.",
    {
      collectionId: z.string(),
    },
    async ({ collectionId }) => {
      try {
        const client = await resolveClient(env);
        await client.misc.deleteProductCollection(collectionId);
        return ok(`Product collection ${collectionId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_list_product_reviews",
    "List product reviews.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.listProductReviews(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_product_inventory",
    "Get product inventory.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.getProductInventory(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== CUSTOM OBJECTS ==========

  server.tool(
    "ghl_get_object_record",
    "Get a custom object record.",
    {
      schemaKey: z.string(),
      recordId: z.string(),
    },
    async ({ schemaKey, recordId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.getObjectRecord(schemaKey, recordId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_object_record",
    "Create a custom object record.",
    {
      schemaKey: z.string(),
      data: z.record(z.any()),
    },
    async ({ schemaKey, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.createObjectRecord(schemaKey, data);
        return ok(`Object record created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_object_record",
    "Update a custom object record.",
    {
      schemaKey: z.string(),
      recordId: z.string(),
      data: z.record(z.any()),
    },
    async ({ schemaKey, recordId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.updateObjectRecord(schemaKey, recordId, data);
        return ok(`Object record updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_object_record",
    "Delete a custom object record.",
    {
      schemaKey: z.string(),
      recordId: z.string(),
    },
    async ({ schemaKey, recordId }) => {
      try {
        const client = await resolveClient(env);
        await client.misc.deleteObjectRecord(schemaKey, recordId);
        return ok(`Object record ${recordId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_search_object_records",
    "Search custom object records.",
    {
      schemaKey: z.string(),
      locationId: z.string().optional(),
      page: z.number().default(1),
      pageLimit: z.number().default(20),
      query: z.string(),
    },
    async ({ schemaKey, locationId, page, pageLimit, query }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.searchObjectRecords(schemaKey, { locationId: locationId || client.locationId, page, pageLimit, query, searchAfter: [] });
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== FUNNEL REDIRECTS ==========

  server.tool(
    "ghl_list_redirects",
    "List funnel redirects.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.listRedirects(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_redirect",
    "Create a funnel redirect.",
    {
      body: z.record(z.any()),
    },
    async ({ body }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.createRedirect(body);
        return ok(`Redirect created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_redirect",
    "Delete a funnel redirect.",
    {
      redirectId: z.string(),
    },
    async ({ redirectId }) => {
      try {
        const client = await resolveClient(env);
        await client.misc.deleteRedirect(redirectId);
        return ok(`Redirect ${redirectId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== ASSOCIATIONS EXPANDED ==========

  server.tool(
    "ghl_get_association_by_object_key",
    "Get an association by object key.",
    {
      objectKey: z.string(),
    },
    async ({ objectKey }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.getAssociationByObjectKey(objectKey);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_relation",
    "Create a relation between records.",
    {
      data: z.record(z.any()),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.createRelation(data);
        return ok(`Relation created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_relations",
    "Get relations for a record.",
    {
      recordId: z.string(),
    },
    async ({ recordId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.getRelations(recordId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_relation",
    "Delete a relation.",
    {
      relationId: z.string(),
    },
    async ({ relationId }) => {
      try {
        const client = await resolveClient(env);
        await client.misc.deleteRelation(relationId);
        return ok(`Relation ${relationId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== CUSTOM OBJECTS SCHEMA ==========

  server.tool(
    "ghl_list_custom_objects",
    "List custom objects for a location.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.listCustomObjects(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_object",
    "Create a custom object schema.",
    {
      data: z.record(z.any()),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.createCustomObject(data);
        return ok(`Custom object created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_object_schema",
    "Get a custom object schema by key.",
    {
      key: z.string(),
    },
    async ({ key }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.getObjectSchema(key);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_object",
    "Update a custom object schema.",
    {
      key: z.string(),
      data: z.record(z.any()),
    },
    async ({ key, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.updateObjectSchema(key, data);
        return ok(`Custom object updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== PRODUCT PRICES (missing + new) ==========

  server.tool(
    "ghl_list_product_prices",
    "List prices for a product.",
    {
      productId: z.string(),
      limit: z.string().optional(),
      offset: z.string().optional(),
    },
    async ({ productId, limit, offset }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.listProductPrices(productId, { limit, offset });
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_product_price",
    "Create a price for a product.",
    {
      productId: z.string(),
      data: z.record(z.any()),
    },
    async ({ productId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.createProductPrice(productId, data);
        return ok(`Product price created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_product_price",
    "Get a specific price for a product.",
    {
      productId: z.string(),
      priceId: z.string(),
    },
    async ({ productId, priceId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.getProductPrice(productId, priceId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_product_price",
    "Update a price for a product.",
    {
      productId: z.string(),
      priceId: z.string(),
      data: z.record(z.any()),
    },
    async ({ productId, priceId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.updateProductPrice(productId, priceId, data);
        return ok(`Product price updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== COURSES ==========

  server.tool(
    "ghl_import_course",
    "Import a course.",
    {
      data: z.record(z.any()),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.importCourse(data);
        return ok(`Course imported!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== PRODUCT REVIEWS (expanded) ==========

  server.tool(
    "ghl_update_product_review",
    "Update a product review.",
    {
      reviewId: z.string().describe("Review ID"),
      data: z.record(z.any()).describe("Updated review data"),
      locationId: z.string().optional().describe("Target location"),
    },
    async ({ reviewId, data, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.updateProductReview(reviewId, data, locationId || client.locationId);
        return ok(`Product review updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_product_review",
    "Delete a product review.",
    {
      reviewId: z.string().describe("Review ID"),
      locationId: z.string().optional().describe("Target location"),
    },
    async ({ reviewId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        await client.misc.deleteProductReview(reviewId, locationId || client.locationId);
        return ok(`Product review ${reviewId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_bulk_update_reviews",
    "Bulk update product reviews.",
    {
      data: z.record(z.any()).describe("Bulk review update data"),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.bulkUpdateReviews(data);
        return ok(`Reviews bulk updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_review_count",
    "Get review count for a product.",
    {
      productId: z.string().describe("Product ID"),
      locationId: z.string().optional().describe("Target location"),
    },
    async ({ productId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.getReviewCount(productId, locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== PRODUCT BULK ==========

  server.tool(
    "ghl_bulk_update_products",
    "Bulk update products.",
    {
      data: z.record(z.any()).describe("Bulk update data"),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.bulkUpdateProducts(data);
        return ok(`Products bulk updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_bulk_edit_products",
    "Bulk edit products.",
    {
      data: z.record(z.any()).describe("Bulk edit data"),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.bulkEditProducts(data);
        return ok(`Products bulk edited!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== STORE INTEGRATION ==========

  server.tool(
    "ghl_add_product_to_store",
    "Add a product to a store.",
    {
      storeId: z.string().describe("Store ID"),
      data: z.record(z.any()).describe("Product data to add"),
    },
    async ({ storeId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.addProductToStore(storeId, data);
        return ok(`Product added to store!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_product_priority",
    "Update product priority in a store.",
    {
      storeId: z.string().describe("Store ID"),
      data: z.record(z.any()).describe("Priority data"),
    },
    async ({ storeId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.updateProductPriority(storeId, data);
        return ok(`Product priority updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_product_store_stats",
    "Get product store statistics.",
    {
      storeId: z.string().describe("Store ID"),
      locationId: z.string().optional().describe("Target location"),
    },
    async ({ storeId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.getProductStoreStats(storeId, locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== INVENTORY (update) ==========

  server.tool(
    "ghl_update_product_inventory",
    "Update product inventory.",
    {
      data: z.record(z.any()).describe("Inventory update data"),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.updateProductInventory(data);
        return ok(`Product inventory updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== PRODUCT PRICES (by location) ==========

  server.tool(
    "ghl_list_product_prices_by_location",
    "List prices for a product filtered by location.",
    {
      productId: z.string().describe("Product ID"),
      locationId: z.string().optional().describe("Target location"),
    },
    async ({ productId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.listProductPricesByLocation(productId, locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== BRAND BOARDS ==========

  server.tool(
    "ghl_list_brand_boards",
    "List brand boards for a location.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.listBrandBoards(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_brand_board",
    "Create a brand board.",
    {
      data: z.record(z.any()),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.createBrandBoard(data);
        return ok(`Brand board created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_brand_board",
    "Get a brand board by ID.",
    {
      brandBoardId: z.string(),
      locationId: z.string().optional(),
    },
    async ({ brandBoardId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.misc.getBrandBoard(brandBoardId, locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_brand_board",
    "Update a brand board.",
    {
      brandBoardId: z.string(),
      data: z.record(z.any()),
    },
    async ({ brandBoardId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.misc.updateBrandBoard(brandBoardId, data);
        return ok(`Brand board updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_brand_board",
    "Delete a brand board.",
    {
      brandBoardId: z.string(),
      locationId: z.string().optional(),
    },
    async ({ brandBoardId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        await client.misc.deleteBrandBoard(brandBoardId, locationId || client.locationId);
        return ok(`Brand board ${brandBoardId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

}
