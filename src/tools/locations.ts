import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Env } from "../types";
import { ok, err, resolveClient } from "./_helpers";

export function registerLocationTools(server: McpServer, env: Env) {
  // ========== LOCATION CREATION & DELETION ==========

  server.tool(
    "ghl_create_location",
    "Create a new sub-account/location.",
    {
      body: z.record(z.any()),
    },
    async ({ body }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.createLocation(body);
        return ok(`Location created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_location",
    "Delete a sub-account/location.",
    {
      locationId: z.string(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        await client.locations.deleteLocation(locationId);
        return ok(`Location ${locationId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_location_timezones",
    "Get available timezones for a location.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.getLocationTimezones(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_search_location_tasks",
    "Search tasks for a location.",
    {
      locationId: z.string().optional(),
      body: z.record(z.any()),
    },
    async ({ locationId, body }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.searchLocationTasks(locationId || client.locationId, body);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== LOCATION TAGS ==========

  server.tool(
    "ghl_list_location_tags",
    "List tags for a location.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.listLocationTags(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_tag",
    "Create a tag for a location.",
    {
      name: z.string(),
      locationId: z.string().optional(),
    },
    async ({ name, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.createTag(name, locationId || client.locationId);
        return ok(`Tag created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_tag",
    "Update a tag.",
    {
      tagId: z.string(),
      name: z.string(),
      locationId: z.string().optional(),
    },
    async ({ tagId, name, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.updateTag(tagId, name, locationId || client.locationId);
        return ok(`Tag updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_tag",
    "Delete a tag.",
    {
      tagId: z.string(),
      locationId: z.string().optional(),
    },
    async ({ tagId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        await client.locations.deleteTag(tagId, locationId || client.locationId);
        return ok(`Tag ${tagId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== CUSTOM FIELDS ==========

  server.tool(
    "ghl_get_location_custom_fields",
    "Get custom fields for a location.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.getLocationCustomFields(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_location_custom_field",
    "Create a custom field for a location.",
    {
      data: z.record(z.any()),
      locationId: z.string().optional(),
    },
    async ({ data, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.createLocationCustomField(data, locationId || client.locationId);
        return ok(`Custom field created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_location_custom_field",
    "Update a custom field for a location.",
    {
      fieldId: z.string(),
      data: z.record(z.any()),
      locationId: z.string().optional(),
    },
    async ({ fieldId, data, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.updateLocationCustomField(fieldId, data, locationId || client.locationId);
        return ok(`Custom field updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_location_custom_field",
    "Delete a custom field for a location.",
    {
      fieldId: z.string(),
      locationId: z.string().optional(),
    },
    async ({ fieldId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        await client.locations.deleteLocationCustomField(fieldId, locationId || client.locationId);
        return ok(`Custom field ${fieldId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_list_custom_fields_v2",
    "List custom fields by object key.",
    {
      objectKey: z.string(),
      locationId: z.string().optional(),
    },
    async ({ objectKey, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.listCustomFieldsV2(objectKey, locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_custom_field",
    "Get a custom field by ID.",
    {
      id: z.string(),
    },
    async ({ id }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.getCustomField(id);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_custom_field",
    "Create a custom field.",
    {
      data: z.record(z.any()),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.createCustomField(data);
        return ok(`Custom field created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_custom_field",
    "Update a custom field.",
    {
      id: z.string(),
      data: z.record(z.any()),
    },
    async ({ id, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.updateCustomField(id, data);
        return ok(`Custom field updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_custom_field",
    "Delete a custom field.",
    {
      id: z.string(),
    },
    async ({ id }) => {
      try {
        const client = await resolveClient(env);
        await client.locations.deleteCustomField(id);
        return ok(`Custom field ${id} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== CUSTOM VALUES ==========

  server.tool(
    "ghl_list_custom_values",
    "List custom values for a location.",
    {
      locationId: z.string().optional(),
      limit: z.number().optional(),
      skip: z.number().optional(),
    },
    async ({ locationId, limit, skip }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.listCustomValues(locationId, { limit, skip });
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_custom_value",
    "Create a custom value for a location.",
    {
      name: z.string().describe("Custom value name"),
      value: z.string().describe("Custom value"),
      locationId: z.string().optional(),
    },
    async ({ name, value, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.createCustomValue({ name, value }, locationId);
        return ok(`Custom value created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_custom_value",
    "Update a custom value.",
    {
      valueId: z.string().describe("Custom value ID"),
      data: z.record(z.any()).describe("Updated data"),
      locationId: z.string().optional(),
    },
    async ({ valueId, data, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.updateCustomValue(valueId, data, locationId);
        return ok(`Custom value updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_custom_value",
    "Delete a custom value.",
    {
      valueId: z.string().describe("Custom value ID"),
      locationId: z.string().optional(),
    },
    async ({ valueId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        await client.locations.deleteCustomValue(valueId, locationId);
        return ok(`Custom value ${valueId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== BUSINESS PROFILE ==========

  server.tool(
    "ghl_get_location_business",
    "Get business details for a location.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.getLocationBusiness(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_location_business",
    "Update business details for a location.",
    {
      locationId: z.string().optional(),
      data: z.record(z.any()),
    },
    async ({ locationId, data }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.updateLocationBusiness(locationId || client.locationId, data);
        return ok(`Business updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== USERS (location-based) ==========

  server.tool(
    "ghl_create_user",
    "Create a new user.",
    {
      body: z.record(z.any()),
    },
    async ({ body }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.createUser(body);
        return ok(`User created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_search_users",
    "Search users.",
    {
      companyId: z.string(),
      query: z.string().optional(),
      role: z.string().optional(),
      locationId: z.string().optional(),
    },
    async ({ companyId, query, role, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.searchUsers(companyId, { query, role, locationId });
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_user",
    "Update a user.",
    {
      userId: z.string(),
      body: z.record(z.any()),
    },
    async ({ userId, body }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.updateUser(userId, body);
        return ok(`User updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_user",
    "Delete a user.",
    {
      userId: z.string(),
    },
    async ({ userId }) => {
      try {
        const client = await resolveClient(env);
        await client.locations.deleteUser(userId);
        return ok(`User ${userId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== LOCATION GET / UPDATE / SEARCH ==========

  server.tool(
    "ghl_get_location",
    "Get details for a specific location/sub-account.",
    {
      locationId: z.string().optional().describe("Location ID"),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.getLocation(locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_location",
    "Update a location/sub-account.",
    {
      locationId: z.string().describe("Location ID"),
      body: z.record(z.any()).describe("Updated location data"),
    },
    async ({ locationId, body }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.updateLocation(locationId, body);
        return ok(`Location updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_search_locations",
    "Search locations/sub-accounts by company ID.",
    {
      companyId: z.string().describe("Company ID"),
      limit: z.string().optional().describe("Max results"),
      skip: z.string().optional().describe("Skip (offset)"),
      order: z.string().optional().describe("Sort order"),
      search: z.string().optional().describe("Search text"),
    },
    async ({ companyId, limit, skip, order, search }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.searchLocations(companyId, { limit, skip, order, search });
        const locations = result.locations || [];
        const summary = locations.map((l: any) => ({
          id: l.id,
          name: l.name,
          email: l.email,
          phone: l.phone,
        }));
        return ok(`${locations.length} location(s):\n\n${JSON.stringify(summary, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== USERS (list / get) ==========

  server.tool(
    "ghl_list_users",
    "List users for a location.",
    {
      locationId: z.string().optional().describe("Target location"),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.listUsers(locationId);
        const users = result.users || [];
        const summary = users.map((u: any) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
        }));
        return ok(`${users.length} user(s):\n\n${JSON.stringify(summary, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_user",
    "Get details for a specific user.",
    {
      userId: z.string().describe("User ID"),
    },
    async ({ userId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.getUser(userId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== CUSTOM FIELD FOLDERS ==========

  server.tool(
    "ghl_create_custom_field_folder",
    "Create a custom field folder.",
    {
      data: z.record(z.any()).describe("Folder data (name, objectKey, etc.)"),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.createCustomFieldFolder(data);
        return ok(`Custom field folder created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_custom_field_folder",
    "Update a custom field folder.",
    {
      folderId: z.string().describe("Folder ID"),
      data: z.record(z.any()).describe("Updated folder data"),
    },
    async ({ folderId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.updateCustomFieldFolder(folderId, data);
        return ok(`Custom field folder updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_custom_field_folder",
    "Delete a custom field folder.",
    {
      folderId: z.string().describe("Folder ID"),
    },
    async ({ folderId }) => {
      try {
        const client = await resolveClient(env);
        await client.locations.deleteCustomFieldFolder(folderId);
        return ok(`Custom field folder ${folderId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== BUSINESS PROFILE (by ID) ==========

  server.tool(
    "ghl_get_business_profile",
    "Get a business profile by business ID.",
    {
      businessId: z.string().describe("Business ID"),
    },
    async ({ businessId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.getBusinessProfile(businessId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_business_profile",
    "Update a business profile by business ID.",
    {
      businessId: z.string().describe("Business ID"),
      data: z.record(z.any()).describe("Updated business data"),
    },
    async ({ businessId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.updateBusinessProfile(businessId, data);
        return ok(`Business profile updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== BUSINESSES ==========

  server.tool(
    "ghl_list_businesses",
    "List businesses for a location.",
    {
      locationId: z.string().optional().describe("Target location"),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.listBusinesses(locationId);
        const businesses = result.businesses || [];
        const summary = businesses.map((b: any) => ({
          id: b.id,
          name: b.name,
          phone: b.phone,
          email: b.email,
        }));
        return ok(`${businesses.length} business(es):\n\n${JSON.stringify(summary, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== RECURRING TASKS ==========

  server.tool(
    "ghl_create_recurring_task",
    "Create a recurring task for a location.",
    {
      locationId: z.string().optional().describe("Location ID"),
      body: z.record(z.any()).describe("Recurring task data"),
    },
    async ({ locationId, body }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.createRecurringTask(locationId || client.locationId, body);
        return ok(`Recurring task created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_recurring_task",
    "Get a recurring task by ID.",
    {
      locationId: z.string().optional().describe("Location ID"),
      taskId: z.string().describe("Recurring task ID"),
    },
    async ({ locationId, taskId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.getRecurringTask(locationId || client.locationId, taskId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_recurring_task",
    "Update a recurring task.",
    {
      locationId: z.string().optional().describe("Location ID"),
      taskId: z.string().describe("Recurring task ID"),
      body: z.record(z.any()).describe("Updated recurring task data"),
    },
    async ({ locationId, taskId, body }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.updateRecurringTask(locationId || client.locationId, taskId, body);
        return ok(`Recurring task updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_recurring_task",
    "Delete a recurring task.",
    {
      locationId: z.string().optional().describe("Location ID"),
      taskId: z.string().describe("Recurring task ID"),
    },
    async ({ locationId, taskId }) => {
      try {
        const client = await resolveClient(env, locationId);
        await client.locations.deleteRecurringTask(locationId || client.locationId, taskId);
        return ok(`Recurring task ${taskId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== OTHER ==========

  server.tool(
    "ghl_upload_custom_field_file",
    "Upload a file for a location custom field.",
    {
      locationId: z.string().optional().describe("Location ID"),
      body: z.record(z.any()).describe("File upload data"),
    },
    async ({ locationId, body }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.uploadCustomFieldFile(locationId || client.locationId, body);
        return ok(`Custom field file uploaded!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_filter_users_by_email",
    "Filter/search users by email address.",
    {
      body: z.record(z.any()).describe("Filter data (e.g., { email: '...' })"),
    },
    async ({ body }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.locations.filterUsersByEmail(body);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_list_location_templates",
    "List templates for a location.",
    {
      locationId: z.string().optional().describe("Location ID"),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.locations.listLocationTemplates(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );
}
