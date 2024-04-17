<?php

namespace App\Http\Controllers;

use App\Actions\Role\DeleteRoleAction;
use App\Actions\Role\StoreRoleAction;
use App\Actions\Role\UpdateRoleAction;
use App\Http\Requests\Role\SaveRoleRequest;
use App\Models\Role;
use App\Repositories\PermissionRepository;
use App\Repositories\RoleRepository;
use App\Utils\FlashMessageBuilder;
use Illuminate\Support\Facades\Gate;

class RoleController extends Controller
{
    function __construct(
        private RoleRepository $roleRepository,
        private PermissionRepository $permissionRepository
    ) {
        $this->authorizeResource(Role::class, 'role');
    }

    public function index()
    {
        return inertia(
            'role/index',
            [
                'roles' => $this->roleRepository->getAllRoles(withUsersCount: true),
            ]
        );
    }

    public function create()
    {
        return inertia('role/create', [
            'availablePermissions' => fn () => $this->permissionRepository->getAllPermissionsGrouped(),
        ]);
    }

    public function store(SaveRoleRequest $request)
    {
        (new StoreRoleAction)->execute($request->validated());

        return redirect()->route('roles.index')->with(FlashMessageBuilder::success(__('crud.store.success')));
    }

    public function show(Role $role)
    {
    }

    public function edit(Role $role)
    {
        $role->load('permissions');

        return inertia('role/edit', [
            'role' => $role,
            'availablePermissions' => fn () => $this->permissionRepository->getAllPermissionsGrouped(),
        ]);
    }

    public function update(SaveRoleRequest $request, Role $role)
    {
        (new UpdateRoleAction)->execute($role, $request->validated());
        return redirect()->route('roles.index')->with(FlashMessageBuilder::success(__('crud.update.success')));
    }

    public function destroy(Role $role)
    {
        (new DeleteRoleAction)->execute($role);
        return redirect()->route('roles.index')->with(FlashMessageBuilder::success(__('crud.delete.success')));
    }
}
