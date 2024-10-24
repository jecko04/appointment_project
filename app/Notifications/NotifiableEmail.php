<?php

namespace App\Notifications;

use Illuminate\Notifications\Notifiable;

class NotifiableEmail
{
    use Notifiable;

    protected $email;

    public function __construct($email)
    {
        $this->email = $email;
    }

    /**
     * Route notifications for mail channel.
     */
    public function routeNotificationForMail($notification)
    {
        return $this->email;
    }
}
