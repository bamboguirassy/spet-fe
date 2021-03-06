const preinscriptionColumns = [
            { header: 'Idfiliere', field: 'idfiliere', dataKey: 'idfiliere' },
            { header: 'Idanneeacad', field: 'idanneeacad', dataKey: 'idanneeacad' },
            { header: 'Idniveau', field: 'idniveau', dataKey: 'idniveau' },
            { header: 'Cni', field: 'cni', dataKey: 'cni' },
            { header: 'Idtypeadmission', field: 'idtypeadmission', dataKey: 'idtypeadmission' },
            { header: 'Ine', field: 'ine', dataKey: 'ine' },
            { header: 'Passage', field: 'passage', dataKey: 'passage' },
            { header: 'Prenometudiant', field: 'prenometudiant', dataKey: 'prenometudiant' },
            { header: 'Nometudiant', field: 'nometudiant', dataKey: 'nometudiant' },
            { header: 'Datenaiss', field: 'datenaiss', dataKey: 'datenaiss' },
            { header: 'Lieunaiss', field: 'lieunaiss', dataKey: 'lieunaiss' },
            { header: 'Email', field: 'email', dataKey: 'email' },
            { header: 'Tel', field: 'tel', dataKey: 'tel' },
            { header: 'Datenotif', field: 'datenotif', dataKey: 'datenotif' },
            { header: 'Datedelai', field: 'datedelai', dataKey: 'datedelai' },
            { header: 'Estinscrit', field: 'estinscrit', dataKey: 'estinscrit' },
            { header: 'CodeOperateur', field: 'codeOperateur', dataKey: 'codeOperateur' },
            { header: 'DatePaiement', field: 'datePaiement', dataKey: 'datePaiement' },
            { header: 'NumeroTransaction', field: 'numeroTransaction', dataKey: 'numeroTransaction' },
            { header: 'Montant', field: 'montant', dataKey: 'montant' },
        ];

const allowedPreinscriptionFieldsForFilter = [
    'idfiliere',
    'idanneeacad',
    'idniveau',
    'cni',
    'idtypeadmission',
    'ine',
    'passage',
    'prenometudiant',
    'nometudiant',
    'datenaiss',
    'lieunaiss',
    'email',
    'tel',
    'datenotif',
    'datedelai',
    'estinscrit',
    'codeOperateur',
    'datePaiement',
    'numeroTransaction',
    'montant',
];

export { preinscriptionColumns,allowedPreinscriptionFieldsForFilter };
