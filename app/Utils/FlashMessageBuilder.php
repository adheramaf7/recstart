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

    public static function fromHttpErrorCode(int $code): array
    {
        $microtime = microtime();
        $message = [
            503 => 'Sorry, we are doing some maintenance. Please check back soon.',
            500 => 'Whoops, something went wrong on our servers.',
            404 => 'Sorry, the page you are looking for could not be found.',
            403 => 'Sorry, you are forbidden from accessing this page.',
        ][$code];

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
