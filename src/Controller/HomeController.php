<?php

namespace App\Controller;

use App\Entity\Meal;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Booking;
use App\Form\BookingType;

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


    /**
     * @Route("/booking", name="booking")
     */
    public function booking(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $user = $this->getUser();

        $booking = new Booking();

        $form = $this->createForm(BookingType::class, $booking);
        $em = $this->getDoctrine()->getManager();
        $booking->setUser($user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($booking);
            $em->flush();
            // possible envoi de mail pour prévenir le restaurant d'une demande de reservation (ici ou avec un service)
            $this->addFlash('success', 'Votre demande de réservation a bien été envoyé');
            return $this->redirectToRoute('homepage');
        }




        return $this->render('user/booking.html.twig', ['form' => $form->createView()]);
    }

}