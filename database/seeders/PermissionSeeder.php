<?php

namespace Database\Seeders;

use App\Enums\PermissionGroup;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{

    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $list = $this->list();

        $inserted = [];

        foreach ($list as $group => $permissions) {
            foreach ($permissions as $permission) {
                Permission::updateOrCreate([
                    'name' => $permission,
                ], ['group' => $group]);

                $inserted[] = $permission;
            }
        }

        $this->deleteUnusedPermissions($inserted);
    }

    private function deleteUnusedPermissions($newPermissions = [])
    {
        if (count($newPermissions) == 0) {
            return;
        }

        $unusedPermissions = Permission::whereNotIn('name', $newPermissions)->get();

        $unusedPermissions->each(function (Permission $permission) {
            $permission->roles()->detach();
            $permission->delete();
        });
    }

    private function list()
    {
        return [
            PermissionGroup::User->name => [
                'view-user',
                'create-user',
                'read-user',
                'update-user',
                'delete-user',
            ],
            PermissionGroup::Role->name => [
                'view-role',
                'create-role',
                'read-role',
                'update-role',
                'delete-role',
            ],
            PermissionGroup::Profile->name => [
                'update-profile',
                'update-password',
            ],
        ];
    }
}
