<?php

namespace App\Http\Middleware;

use App\Data\UserData;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'id'      => fn () => $request->session()->get('flash_id'),
                'type'    => fn () => $request->session()->get('flash_type'),
                'message' => fn () => $request->session()->get('flash_message'),
            ],
            'permissions' => function () use ($request) {
                $user = $request->user();

                if ($request->user() == null) {
                    return null;
                }

                if ($user->hasRole('Superadmin')) {
                    return Permission::all()->pluck('name')->toArray();
                }

                $rolesWithPermissions = $user->roles()->with('permissions:name')->get();
                $permissions = $rolesWithPermissions->pluck('permissions')->flatten()->pluck('name')->toArray();

                return $permissions;
            },
        ];
    }
}
