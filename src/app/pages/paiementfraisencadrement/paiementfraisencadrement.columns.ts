const paiementfraisencadrementColumns = [
            { header: 'Date paiement', field: 'datePaiement', dataKey: 'datePaiement' },
            { header: 'Montant payé', field: 'montantPaye', dataKey: 'montantPaye' },
            { header: 'Methode de paiement', field: 'methodePaiement', dataKey: 'methodePaiement' },
        ];

const allowedPaiementfraisencadrementFieldsForFilter = [
    'datePaiement',
    'montantPaye',
    'methodePaiement',
];

export { paiementfraisencadrementColumns,allowedPaiementfraisencadrementFieldsForFilter };
