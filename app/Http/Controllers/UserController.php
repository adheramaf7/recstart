<?php

namespace App\Http\Controllers;

use App\Actions\User\DeleteUserAction;
use App\Actions\User\StoreUserAction;
use App\Actions\User\UpdateUserAction;
use App\Models\User;
use App\Http\Requests\User\SaveUserRequest;
use App\Repositories\RoleRepository;
use App\Repositories\UserRepository;
use App\Utils\FlashMessageBuilder;

class UserController extends Controller
{

    function __construct(private UserRepository $userRepository, private RoleRepository $roleRepository)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('user/index', [
            'users' => fn () => $this->userRepository->getAllUsers(withRole: true),
            'roles' => fn () => $this->roleRepository->getAllRoles(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('user/create', [
            'roles' => fn () => $this->roleRepository->getAllRoles(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveUserRequest $request)
    {
        (new StoreUserAction)->execute($request->validated());
        return redirect()->route('users.index')->with(FlashMessageBuilder::success(__('crud.store.success')));
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load('roles');

        return inertia('user/edit', [
            'user'  => $user,
            'roles' => fn () => $this->roleRepository->getAllRoles(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveUserRequest $request, User $user)
    {
        (new UpdateUserAction)->execute($user, $request->validated());
        return redirect()->route('users.index')->with(FlashMessageBuilder::success(__('crud.update.success')));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        (new DeleteUserAction)->execute($user);
        return redirect()->route('users.index')->with(FlashMessageBuilder::success(__('crud.delete.success')));
    }
}
