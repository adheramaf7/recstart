<?php

namespace App\Actions\User;

use App\Exceptions\GeneralException;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Spatie\QueueableAction\QueueableAction;

class StoreUserAction
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
    public function execute(array $payload): User
    {
        try {
            $user = User::create($payload);

            $user->roles()->sync([
                $payload['role']
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            throw new GeneralException(__('common.error_try_again'));
        }

        return $user;
    }
}
