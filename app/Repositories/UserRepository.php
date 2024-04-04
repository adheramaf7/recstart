<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    function getAllUsers(bool $withRole = false)
    {
        return $this->model->query()
            ->when($withRole, fn ($query) => $query->with('roles'))
            ->where('id', '<>', 1)
            ->get();
    }
}
