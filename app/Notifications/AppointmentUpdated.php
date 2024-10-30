<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentUpdated extends Notification
{
    use Queueable;

    protected $appointment;
    protected $action;

    public function __construct($appointment, $action)
    {
        $this->appointment = $appointment;
        $this->action = $action;
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        if (!$this->appointment) {
            return (new MailMessage)
                ->greeting('Hello SMTC Dental Care!')
                ->line('No appointment details available.')
                ->line('Thank you for using our application!');
        }

        return (new MailMessage)
            ->greeting('Hello SMTC Dental Care!')
            ->subject("Appointment {$this->action}")
            ->line("An appointment has been {$this->action}.")
            ->line("Appointment Details:")
            ->line("Appointment ID: {$this->appointment->id}")
            ->line("Branch Name: {$this->appointment->branch->BranchName}")
            ->line("Patient Name: {$this->appointment->users->name}")
            ->line("Service: {$this->appointment->services->Title}")
            ->line("Appointment Date: {$this->appointment->appointment_date}")
            ->line("Appointment Time: {$this->appointment->appointment_time}")
            ->when($this->appointment->reschedule_date, function ($mailMessage) {
                return $mailMessage->line("Reschedule Date: {$this->appointment->reschedule_date}")
                                    ->line("Reschedule Time: {$this->appointment->reschedule_time}");
            })
            ->line("Status: {$this->appointment->status}");
        }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
