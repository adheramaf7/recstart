<?php

namespace App\Data;

use Carbon\Carbon;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('TRole')]
class RoleData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public Carbon $created_at,
        public Carbon $updated_at,
    ) {
    }
}
