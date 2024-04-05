<?php

namespace App\Models;

use Spatie\Permission\Models\Role as ModelsRole;
use Wildside\Userstamps\Userstamps;

class Role extends ModelsRole
{
    use Userstamps;
}
