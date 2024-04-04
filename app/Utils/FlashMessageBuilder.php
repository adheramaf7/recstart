<?php

namespace App\Utils;

use App\Enums\FlashMessageType;

class FlashMessageBuilder
{

    public function __construct(private string $id, private FlashMessageType $type, private string $message)
    {
        //
    }

    public static function success(string $message): array
    {
        $microtime = microtime();
        return (new self($microtime, FlashMessageType::SUCCESS, $message))->toArray();
    }

    public static function error(string $message): array
    {
        $microtime = microtime();
        return (new self($microtime, FlashMessageType::ERROR, $message))->toArray();
    }

    public function toArray(): array
    {
        return [
            'flash_id'      => $this->id,
            'flash_type'    => $this->type->value,
            'flash_message' => $this->message,
        ];
    }
}
