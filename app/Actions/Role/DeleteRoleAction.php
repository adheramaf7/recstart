<?php

namespace App\Actions\Role;

use App\Exceptions\GeneralException;
use App\Models\Role;
use Illuminate\Support\Facades\Log;
use Spatie\QueueableAction\QueueableAction;

class DeleteRoleAction
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
    public function execute(Role $role): void
    {
        if ($role->users()->exists()) {
            throw new GeneralException('Delete Failed! There is a user associated with this role');
        }

        try {
            $role->permissions()->detach();
            $role->delete();
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            throw new GeneralException(__('common.error_try_again'));
        }
    }
}
