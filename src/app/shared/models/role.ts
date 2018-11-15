export interface Permission {
  productId?: number;
  resource: string;
  action: string;
  effect: string;
}

export interface Role {
  roleId: number;
  accountId?: number;
  roleName: string;
  permissions: Permission[];
};

export enum PredefinedRoles {
  Administrator = 1505785784168,
  Operator = 1505795919719,
  'Read Only Operator' = 1505795926276
}
