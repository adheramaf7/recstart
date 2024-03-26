<?php

namespace App\Providers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\ServiceProvider;

class MigrationMacroProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Blueprint::macro('userstamps', function () {
            $this->unsignedBigInteger('created_by')->nullable();
            $this->unsignedBigInteger('updated_by')->nullable();
            $this->index('created_by');
            $this->index('updated_by');
        });
        Blueprint::macro('dropUserstamps', function () {
            $this->dropColumn(['created_by', 'updated_by']);
            // $this->dropIndex("{$this->table}_created_by_index");
            // $this->dropIndex("{$this->table}_updated_by_index");
        });
        Blueprint::macro('softDeletesUserstamp', function () {
            $this->unsignedBigInteger('deleted_by')->nullable();
            $this->index(['deleted_by']);
        });
        Blueprint::macro('dropSoftDeletesUserstamp', function () {
            $this->dropColumn(['deleted_by']);
            // $this->dropIndex("{$this->table}_deleted_by_index");
        });
        Blueprint::macro('userTimestamps', function (bool $withSoftDelete = false) {
            $this->timestamps();
            $this->userstamps();

            if ($withSoftDelete) {
                $this->softDeletes();
                $this->softDeletesUserstamp();
            }
        });
        Blueprint::macro('dropUserTimestamps', function (bool $withSoftDelete = false) {
            $this->dropTimestamps();
            $this->dropUserstamps();

            if ($withSoftDelete) {
                $this->dropSoftDeletes();
                $this->dropSoftDeletesUserstamp();
            }
        });
    }
}
