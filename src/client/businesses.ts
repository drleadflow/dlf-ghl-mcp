import { BaseGHLClient } from "./base";

export function businessMethods(client: BaseGHLClient) {
  return {
    async listBusinesses(locationId?: string) {
      return client.request<any>("GET", `/businesses/`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async createBusiness(data: any) {
      return client.request<any>("POST", `/businesses/`, {
        body: { ...data, locationId: data.locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async getBusiness(businessId: string) {
      return client.request<any>("GET", `/businesses/${businessId}`, {
        version: "2021-07-28",
      });
    },

    async updateBusiness(businessId: string, data: any) {
      return client.request<any>("PUT", `/businesses/${businessId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteBusiness(businessId: string) {
      return client.request<any>("DELETE", `/businesses/${businessId}`, {
        version: "2021-07-28",
      });
    },
  };
}
