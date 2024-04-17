<?php

namespace Tests\Feature\AccessManagement;

use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserTest extends TestCase
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
        $user = User::factory()->grantPermissions('view-user')->create();

        $response  = $this->actingAs($user)
            ->get('/users');

        $response->assertOk();
    }

    public function test_list_page_is_forbidden(): void
    {
        $user = User::factory()->create();

        $response  = $this->actingAs($user)
            ->get('/users');

        $response->assertForbidden();
    }

    public function test_create_page_is_displayed(): void
    {
        $user = User::factory()->grantPermissions('create-user')->create();

        $response  = $this->actingAs($user)
            ->from('/users')
            ->get('/users/create');

        $response->assertOk();
    }

    public function test_create_page_is_forbidden(): void
    {
        $user = User::factory()->create();

        $response  = $this->actingAs($user)
            ->from('/users')
            ->get('/users/create');

        $response->assertForbidden();
    }

    public function test_user_can_be_created(): void
    {
        $user = User::factory()->grantPermissions('create-user')->create();

        $role = Role::create(['name' => 'Role Test']);

        $response  = $this->actingAs($user)
            ->from('/users/create')
            ->post('/users', [
                'name'                  => 'User name',
                'email'                 => 'email@email.com',
                'password'              => '12345aaaa',
                'password_confirmation' => '12345aaaa',
                'role'                  => $role->id,
            ]);

        $response->assertSessionHasNoErrors()
            ->assertRedirect('/users');

        $this->assertDatabaseHas('users', [
            'name'  => 'User name',
            'email' => 'email@email.com',
        ]);
    }

    public function test_user_cannot_be_created_when_has_no_access(): void
    {
        $user = User::factory()->create();

        $role = Role::create(['name' => 'Role Test']);

        $response  = $this->actingAs($user)
            ->from('/users/create')
            ->post('/users', [
                'name'                  => 'User name',
                'email'                 => 'email@email.com',
                'password'              => '12345aaaa',
                'password_confirmation' => '12345aaaa',
                'role'                  => $role->id,
            ]);

        $response->assertForbidden();
    }

    public function test_user_cannot_be_created_when_required_fields_is_null(): void
    {
        $user = User::factory()->grantPermissions('create-user')->create();

        $role = Role::create(['name' => 'Role Test']);

        $response  = $this->actingAs($user)
            ->from('/users/create')
            ->post('/users', []);

        $response->assertInvalid(['name', 'email', 'password', 'role']);
    }

    public function test_user_cannot_be_created_when_password_confirmation_is_not_same(): void
    {
        $user = User::factory()->grantPermissions('create-user')->create();

        $role = Role::create(['name' => 'Role Test']);

        $response  = $this->actingAs($user)
            ->from('/users/create')
            ->post('/users', [
                'name'                  => 'Username',
                'email'                 => 'email@email.com',
                'password'              => '12345aaaa',
                'password_confirmation' => '12345aaa',
                'role'                  => $role->id,
            ]);

        $response->assertInvalid(['password']);
    }

    public function test_user_cannot_be_created_when_email_is_already_exists(): void
    {
        $user = User::factory()->grantPermissions('create-user')->create();

        $role = Role::create(['name' => 'Role Test']);
        $userCreate = User::factory()->create([
            'email' => 'email@email.com'
        ]);

        $response  = $this->actingAs($user)
            ->from('/users/create')
            ->post('/users', [
                'name'                  => 'Username',
                'email'                 => 'email@email.com',
                'password'              => '12345aaaa',
                'password_confirmation' => '12345aaa',
                'role'                  => $role->id,
            ]);

        $response->assertInvalid(['email']);
    }

    function test_edit_page_is_displayed(): void
    {
        $user = User::factory()->grantPermissions('update-user')->create();

        $editUser = User::factory()->create();

        $response = $this->actingAs($user)
            ->from('/users')
            ->get("/users/{$editUser->id}/edit");

        $response->assertOk();
    }

    function test_edit_page_is_forbidden(): void
    {
        $user = User::factory()->create();

        $editUser = User::factory()->create();


        $response = $this->actingAs($user)
            ->from('/users')
            ->get("/users/{$editUser->id}/edit");

        $response->assertForbidden();
    }

    function test_user_can_be_updated(): void
    {
        $user = User::factory()->grantPermissions('update-user')->create();

        $role = Role::create(['name' => 'Role Test']);
        $role2 = Role::create(['name' => 'Role 2 Test']);

        $existingUser = User::factory()->create([
            'name'     => 'User Name',
            'email'    => 'email@email.com',
            'password' => '12345678',
        ]);
        $existingUser->assignRole($role->id);

        $response = $this->actingAs($user)
            ->from("/users/{$existingUser->id}/edit",)
            ->put("/users/{$existingUser->id}", [
                'name'                  => 'New User Name',
                'email'                 => 'new_email@mail.com',
                'password'              => 'new_password123',
                'password_confirmation' => 'new_password123',
                'role'                  => $role2->id,
            ]);


        $response->assertSessionHasNoErrors()
            ->assertRedirect('/users');

        $existingUser->refresh();

        $this->assertEquals('New User Name', $existingUser->name);
        $this->assertEquals('new_email@mail.com', $existingUser->email);
        $this->assertTrue(Hash::check('new_password123', $existingUser->password));
        $this->assertContains($role2->id, $existingUser->roles->pluck('id')->toArray());
    }

    function test_user_cannot_be_updated_when_has_no_access(): void
    {
        $user = User::factory()->create();

        $existingUser = User::factory()->create([
            'name'     => 'User Name',
            'email'    => 'email@email.com',
            'password' => '12345678',
        ]);

        $response = $this->actingAs($user)
            ->from("/users/{$existingUser->id}/edit",)
            ->put("/users/{$existingUser->id}", [
                'name'                  => 'New User Name',
                'email'                 => 'new_email@mail.com',
                'password'              => 'new_password123',
                'password_confirmation' => 'new_password123',
            ]);

        $response->assertForbidden();
    }

    function test_user_can_be_deleted(): void
    {
        $user = User::factory()->grantPermissions('delete-user')->create();

        $existingUser = User::factory()->create([
            'name'     => 'User Name',
            'email'    => 'email@email.com',
            'password' => '12345678',
        ]);

        $response = $this->actingAs($user)
            ->from('/users')
            ->delete("/users/{$existingUser->id}");

        $response->assertSessionHasNoErrors()
            ->assertRedirect('/users');

        $this->assertModelMissing($existingUser);
    }

    function test_user_cannot_be_deleted_when_has_no_access(): void
    {
        $user = User::factory()->create();

        $existingUser = User::factory()->create([
            'name'     => 'User Name',
            'email'    => 'email@email.com',
            'password' => '12345678',
        ]);

        $response = $this->actingAs($user)
            ->from('/users')
            ->delete("/users/{$existingUser->id}");

        $response->assertForbidden();
    }
}
