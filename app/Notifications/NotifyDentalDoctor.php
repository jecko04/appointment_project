<?php

namespace App\Notifications;

use App\Models\DentalDoctorModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotifyDentalDoctor extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    protected $doctor;

    public function __construct(DentalDoctorModel $doctor)
    {
        $this->doctor = $doctor;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject('New Request for Dentist Legitimacy')
        ->line('This is our dental doctor:')
        ->line('Name: ' . $this->doctor->Name)
        ->line('Specialization: ' . $this->doctor->Specialization)
        ->line('License Number: ' . $this->doctor->License_Number)
        ->line('These details prove that they are legitimate and authorized to practice.');
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
