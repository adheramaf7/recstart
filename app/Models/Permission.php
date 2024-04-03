<?php

namespace App\Models;

use App\Enums\PermissionGroup;
use Spatie\Permission\Models\Permission as ModelsPermission;

class Permission extends ModelsPermission
{

    protected function casts(): array
    {
        return [
            'group' => PermissionGroup::class,
        ];
    }
}
