const admin=require('../admin/admin');
exports.retrieveData=(req,res)=>{
    admin.appdatabase.ref('/questionswbjee').once('value').then((snap)=>{
        const data=snap.val();
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(500).send(err.message)
    })
}
exports.retrieveDatajeemain=(req,res)=>{
    admin.appdatabase.ref('/questionsjeemain').once('value').then((snap)=>{
        const data=snap.val();
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(500).send(err.message)
    })
}