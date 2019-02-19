<?php

namespace App\Controller;

use App\Entity\Meal;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function index()
    {
        $meals = $this->getDoctrine()
            ->getRepository(Meal::class)
            ->findAll();

        return $this->render('index.html.twig', [
            'meals' => $meals,
        ]);
    }
}