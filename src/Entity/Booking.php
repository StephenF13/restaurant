<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BookingRepository")
 */
class Booking
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le nom doit être indiqué")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le téléphone doit être indiqué")
     * @Assert\Regex("/^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/", message="Le téléphone doit être valide")
     * @Assert\Length(max="14",min="9", minMessage="Le téléphone doit être valide", maxMessage="Le téléphone doit être valide")
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="L'email doit être indiqué")
     * @Assert\Email(message="Ce n'est pas un email valide")
     */
    private $email;

    /**
     * @ORM\Column(type="integer")
     * @Assert\Range(
     *      min = 1,
     *      max = 10,
     *      minMessage = "Impossible de réserver pour moins d'une personne",
     *      maxMessage = "Impossible de réserver pour plus de 10 personnes"
     * )
     */
    private $seats;

    /**
     * @ORM\Column(type="date")
     * @Assert\NotBlank(message="La date doit être indiquée")
     * @Assert\Date(message="Ce n'est pas une date valide")
     * @Assert\GreaterThan("yesterday", message="Ce n'est pas une date valide")
     * @Assert\LessThan("+90days", message="Ce n'est pas une date valide")
     */
    private $date;

    /**
     * @ORM\Column(type="time")
     * @Assert\NotBlank(message="L'heure doit être indiquée")
     * @Assert\Time(message="Ce n'est pas une heure valide")
     */
    private $time;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\user", inversedBy="bookings")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getSeats(): ?int
    {
        return $this->seats;
    }

    public function setSeats(int $seats): self
    {
        $this->seats = $seats;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getTime(): ?\DateTimeInterface
    {
        return $this->time;
    }

    public function setTime(\DateTimeInterface $time): self
    {
        $this->time = $time;

        return $this;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): self
    {
        $this->user = $user;

        return $this;
    }
}
