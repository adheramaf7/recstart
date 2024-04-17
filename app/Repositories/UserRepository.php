<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    function getAllUsers(bool $withRole = false, array $roles = [])
    {
        return $this->model->query()
            ->when($withRole, fn ($query) => $query->with('roles'))
            ->when(count($roles) > 0, fn ($query) => $query->whereHas('roles', fn ($query) => $query->whereIn('id', $roles)))
            ->whereDoesntHave('roles', fn ($query) => $query->where('name', 'Superadmin'))
            ->get();
    }
}
