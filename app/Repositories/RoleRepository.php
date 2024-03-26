<?php

namespace App\Repositories;

use App\Models\Role;

class RoleRepository extends BaseRepository
{

    public function __construct(Role $role)
    {
        $this->model = $role;
    }

    function getAllRoles()
    {
        return $this->model->query()
            ->where('name', '<>', 'Superadmin')
            ->get();
    }
}
