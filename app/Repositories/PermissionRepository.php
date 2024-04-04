<?php

namespace App\Repositories;

use App\Models\Permission;

class PermissionRepository extends BaseRepository
{

    public function __construct(Permission $permission)
    {
        $this->model = $permission;
    }

    function getAllPermissionsGrouped()
    {
        $permissions = $this->model->all();

        $permissions = $permissions->groupBy('group');
        return $permissions;
    }
}
