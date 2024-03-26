<?php

namespace App\Http\Controllers;

use App\Data\RoleData;
use App\Http\Requests\Role\SaveRoleRequest;
use App\Models\Role;
use App\Repositories\RoleRepository;
use Illuminate\Http\Request;

class RoleController extends Controller
{

    function __construct(private RoleRepository $roleRepository)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia(
            'role/index',
            [
                'roles' => fn () => RoleData::collect($this->roleRepository->getAllRoles()),
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('role/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveRoleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveRoleRequest $request, Role $role)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        //
    }
}
