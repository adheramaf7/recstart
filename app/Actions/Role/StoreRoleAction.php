<?php

namespace App\Actions\Role;

use App\Exceptions\GeneralException;
use App\Models\Role;
use Illuminate\Support\Facades\Log;
use Spatie\QueueableAction\QueueableAction;

class StoreRoleAction
{
    use QueueableAction;

    /**
     * Create a new action instance.
     *
     * @return void
     */
    public function __construct()
    {
        // Prepare the action for execution, leveraging constructor injection.
    }

    /**
     * Execute the action.
     *
     * @return mixed
     */
    public function execute(array $payload): Role
    {
        try {
            $role = Role::create($payload);

            $role->permissions()->sync($payload['permissions']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            throw new GeneralException(__('common.error_try_again'));
        }

        return $role;
    }
}
