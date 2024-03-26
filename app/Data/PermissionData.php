<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('TPermission')]
class PermissionData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
    ) {
    }
}
