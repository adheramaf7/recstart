<?php

namespace App\Exceptions;

use Exception;
use Throwable;
use Illuminate\Http\Request;
use App\Enums\FlashStatusEnum;
use App\Helper\FlashMessage;
use App\Utils\FlashMessageBuilder;
use Illuminate\Support\Facades\Log;

class GeneralException extends Exception
{


    public function __construct(public string $message, public $data = null, $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    /**
     * Report the exception.
     */
    public function report()
    {
        //
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function render(Request $request)
    {
        return redirect()
            ->back()
            ->with(FlashMessageBuilder::error($this->message));
    }
}
