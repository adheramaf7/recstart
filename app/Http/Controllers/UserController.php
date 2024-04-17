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
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{

    function __construct(private UserRepository $userRepository, private RoleRepository $roleRepository)
    {
        $this->authorizeResource(User::class, 'user');
    }

    public function index(Request $request)
    {
        return inertia('user/index', [
            'users'   => fn () => $this->userRepository->getAllUsers(withRole: true, roles: $request->query('roles', [])),
            'roles'   => fn () => $this->roleRepository->getAllRoles(withUsersCount: true),
            'filters' => fn () => ['roles' => $request->query('roles', [])]
        ]);
    }

    public function create()
    {
        return inertia('user/create', [
            'roles' => fn () => $this->roleRepository->getAllRoles(),
        ]);
    }

    public function store(SaveUserRequest $request)
    {
        (new StoreUserAction)->execute($request->validated());
        return redirect()->route('users.index')->with(FlashMessageBuilder::success(__('crud.store.success')));
    }

    public function show(User $user)
    {
        //
    }

    public function edit(User $user)
    {
        $user->load('roles');

        return inertia('user/edit', [
            'user'  => $user,
            'roles' => fn () => $this->roleRepository->getAllRoles(),
        ]);
    }

    public function update(SaveUserRequest $request, User $user)
    {
        (new UpdateUserAction)->execute($user, $request->validated());
        return redirect()->route('users.index')->with(FlashMessageBuilder::success(__('crud.update.success')));
    }

    public function destroy(User $user)
    {
        (new DeleteUserAction)->execute($user);
        return redirect()->route('users.index')->with(FlashMessageBuilder::success(__('crud.delete.success')));
    }
}
