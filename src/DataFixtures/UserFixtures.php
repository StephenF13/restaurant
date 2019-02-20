<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        // On configure les langues de nos données
        $faker = Faker\Factory::create('fr_FR');


        // on créé 10 users
        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setFirstName($faker->firstName);
            $user->setLastName($faker->lastName);
            $user->setAddress($faker->streetAddress);
            $user->setCity($faker->city);
            $user->setZipCode($faker->postcode);
            $user->setPhone($faker->phoneNumber);
            $user->setEmail(sprintf('userdemo%d@example.com', $i));
            $user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'userdemo'
            ));
            $manager->persist($user);
        }

        $manager->flush();

    }
}