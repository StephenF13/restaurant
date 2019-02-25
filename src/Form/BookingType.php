<?php

namespace App\Form;

use App\Entity\Booking;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BookingType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, ['label' => 'Nom'])
            ->add('phone', TextType::class, ['label' => 'Téléphone', 'attr' => ['minlength' => 9, 'maxlength' => 14]])
            ->add('email', EmailType::class, ['label' => 'E-mail'])
            ->add('seats', IntegerType::class, ['label' => 'Nombre de personnes', 'attr' => ['min' => 1, 'max' => 10]])
            ->add('date', DateType::class,
                ['label' => 'Date', 'widget' => 'single_text', 'html5' => true, 'format' => 'yyyy-MM-dd'])
            ->add('time', TimeType::class, [
                'label' => 'Heure',
                'input' => 'datetime',
                'widget'  => 'choice',
                'hours'   => [12, 13, 19, 20, 21],
                'minutes' => [10, 20, 30, 40, 50],
            ])
            ->add('save', SubmitType::class, ['label' => 'Réserver']);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Booking::class,
        ]);
    }
}
