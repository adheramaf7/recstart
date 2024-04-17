<?php

namespace Tests\Feature\AccessManagement;

use App\Enums\FlashMessageType;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RoleTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionSeeder::class);
        $this->app->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function test_list_page_is_displayed(): void
    {
        $user = User::factory()->grantPermissions('view-role')->create();

        $response  = $this->actingAs($user)
            ->get('/roles');

        $response->assertOk();
    }

    public function test_forbidden_to_view_list_page(): void
    {
        $user = User::factory()->create();

        $response  = $this->actingAs($user)
            ->get('/roles');

        $response->assertForbidden();
    }

    public function test_create_page_is_displayed(): void
    {
        $user = User::factory()->grantPermissions('create-role')->create();

        $response  = $this->actingAs($user)
            ->from('/roles')
            ->get('/roles/create');

        $response->assertOk();
    }

    public function test_create_page_is_forbidden(): void
    {
        $user = User::factory()->create();

        $response  = $this->actingAs($user)
            ->from('/roles')
            ->get('/roles/create');

        $response->assertForbidden();
    }

    public function test_role_can_be_created(): void
    {
        $user = User::factory()->grantPermissions('create-role')->create();

        $permissions = Permission::all()->map(fn ($permission) => $permission->id)->toArray();

        $response  = $this->actingAs($user)
            ->from('/roles/create')
            ->post('/roles', [
                'name' => 'Role Test',
                'permissions' => $permissions,
            ]);

        $response->assertSessionHasNoErrors()
            ->assertRedirect('/roles');

        $this->assertDatabaseHas('roles', ['name' => 'Role Test']);
    }

    public function test_role_cannot_be_when_required_fields_is_null(): void
    {
        $user = User::factory()->grantPermissions('create-role')->create();

        $response  = $this->actingAs($user)
            ->from('/roles/create')
            ->post('/roles', []);

        $response->assertInvalid(['name', 'permissions']);
    }

    public function test_role_cannot_be_created_when_no_permission_is_selected(): void
    {
        $user = User::factory()->grantPermissions('create-role')->create();

        $response  = $this->actingAs($user)
            ->from('/roles/create')
            ->post('/roles', [
                'name' => 'Role Test',
            ]);

        $response->assertInvalid(['permissions']);
    }

    public function test_role_cannot_be_created_when_already_exists(): void
    {
        $user = User::factory()->grantPermissions('create-role')->create();

        Role::create(['name' =>  'Role Test']);

        $response  = $this->actingAs($user)
            ->from('/roles/create')
            ->post('/roles', [
                'name' => 'Role Test',
            ]);

        $response->assertInvalid(['name']);
    }

    public function test_edit_page_is_displayed(): void
    {
        $user = User::factory()->grantPermissions('update-role')->create();

        $role = Role::create(['name' =>  'Role Test']);

        $response  = $this->actingAs($user)
            ->get("/roles/{$role->id}/edit");

        $response->assertOk();
    }

    public function test_edit_page_is_forbidden(): void
    {
        $user = User::factory()->create();

        $role = Role::create(['name' =>  'Role Test']);

        $response  = $this->actingAs($user)
            ->get("/roles/{$role->id}/edit");

        $response->assertForbidden();
    }

    public function test_role_can_be_updated(): void
    {
        $user = User::factory()->grantPermissions('update-role')->create();

        $role = Role::create(['name' =>  'Role Test']);
        $permissions = Permission::all()->pluck('id');
        $role->permissions()->sync($permissions);

        $newPermissions = $permissions->random($permissions->count() - 5)->toArray();
        $response  = $this->actingAs($user)
            ->from("/roles/{$role->id}/edit")
            ->put("/roles/{$role->id}", [
                'name'        => 'Role Test Updated',
                'permissions' => $newPermissions,
            ]);

        $response->assertSessionHasNoErrors()
            ->assertRedirect('/roles');

        $role->refresh();

        $this->assertEquals('Role Test Updated', $role->name);
        $this->assertEqualsCanonicalizing($newPermissions, $role->permissions->pluck('id')->toArray());
    }

    public function test_role_cannot_be_updated_when_has_no_access(): void
    {
        $user = User::factory()->create();

        $role = Role::create(['name' =>  'Role Test']);
        $permissions = Permission::all()->pluck('id');
        $role->permissions()->sync($permissions);

        $response  = $this->actingAs($user)
            ->from("/roles/{$role->id}/edit")
            ->put("/roles/{$role->id}", [
                'name'        => 'Role Test Updated',
                'permissions' => $permissions->random($permissions->count() - 5)->toArray(),
            ]);

        $response->assertForbidden();
    }

    public function test_role_can_be_deleted(): void
    {
        $user = User::factory()->grantPermissions('delete-role')->create();

        $role = Role::create(['name' =>  'Role Test']);
        $permissions = Permission::all()->pluck('id');
        $role->permissions()->sync($permissions);

        $response  = $this->actingAs($user)
            ->delete("/roles/{$role->id}");

        $response->assertSessionHasNoErrors()
            ->assertRedirect('/roles');

        $this->assertDatabaseMissing('roles', ['name' => 'Role Test']);
    }

    public function test_role_cannot_be_deleted_when_has_no_access(): void
    {
        $user = User::factory()->create();

        $role = Role::create(['name' =>  'Role Test']);
        $permissions = Permission::all()->pluck('id');
        $role->permissions()->sync($permissions);

        $response  = $this->actingAs($user)
            ->delete("/roles/{$role->id}");

        $response->assertForbidden();
    }
}
