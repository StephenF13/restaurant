<?php

namespace App\DataFixtures;

use App\Entity\Meal;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class MealFixtures extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {

        $meal1 = new Meal();
        $meal1->setName('bacon cheeseburger ');
        $meal1->setDescription('Un super burger !');
        $meal1->setBuyPrice(5);
        $meal1->setSalePrice(8);
        $meal1->setQuantityInStock(150);
        $meal1->setImage($this->getReference('media1'));
        $manager->persist($meal1);

        $meal2 = new Meal();
        $meal2->setName('bagel thon ');
        $meal2->setDescription('Un super bagel !');
        $meal2->setBuyPrice(3);
        $meal2->setSalePrice(6);
        $meal2->setQuantityInStock(250);
        $meal2->setImage($this->getReference('media2'));
        $manager->persist($meal2);

        $meal3 = new Meal();
        $meal3->setName('carrot cake ');
        $meal3->setDescription('Un super gâteau !');
        $meal3->setBuyPrice(2);
        $meal3->setSalePrice(3.5);
        $meal3->setQuantityInStock(80);
        $meal3->setImage($this->getReference('media3'));
        $manager->persist($meal3);

        $meal4 = new Meal();
        $meal4->setName('donut ');
        $meal4->setDescription('Un super donut !');
        $meal4->setBuyPrice(1);
        $meal4->setSalePrice(2.5);
        $meal4->setQuantityInStock(75);
        $meal4->setImage($this->getReference('media4'));
        $manager->persist($meal4);


        $manager->flush();
    }

    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 4;
    }
}