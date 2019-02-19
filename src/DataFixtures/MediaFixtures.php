<?php

namespace App\DataFixtures;

use App\Entity\Media;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class MediaFixtures extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $media1 = new Media();
        $media1->setUrl('bacon_cheeseburger.jpg');
        $media1->setAlt('bacon cheeseburger');
        $manager->persist($media1);

        $media2 = new Media();
        $media2->setUrl('bagel_thon.jpg');
        $media2->setAlt('bagel thon');
        $manager->persist($media2);

        $media3 = new Media();
        $media3->setUrl('carrot_cake.jpg');
        $media3->setAlt('carrot cake');
        $manager->persist($media3);

        $media4 = new Media();
        $media4->setUrl('chocolate_donut.jpg');
        $media4->setAlt('donut');
        $manager->persist($media4);

        $manager->flush();

        $this->addReference('media1', $media1);
        $this->addReference('media2', $media2);
        $this->addReference('media3', $media3);
        $this->addReference('media4', $media4);
    }

    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 3;
    }
}