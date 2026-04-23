const Calculation = require("../models/Calculation");

exports.createCalculation = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const {  size , wall_consi, D_T_allo ,projname} = req.body.payload;
    console.log("WHOLE req"+req);
    console.log(size);
    console.log(wall_consi);
    console.log(D_T_allo);
    console.log(projname);
    
    
    const D_T_actu = size / wall_consi ;
    console.log(D_T_actu);
    console.log(projname);
    const result = D_T_actu > D_T_allo ? "PASS" : "FAIL";
    console.log(result);
    //console.log(pressure + "form back");
    const calc = new Calculation({
      
      user_id,
      input: { size, wall_consi, D_T_allo},
      result,
      D_T_actu,
      projname 
    //iconClass
    });

   await calc.save();
   res.json(calc);

  } catch (err) {
    console.log(err);
    
    res.status(500).json({err});
  }
};

exports.getStats = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const total = await Calculation.countDocuments({ user_id });
    const passed = await Calculation.countDocuments({ user_id, result: "PASS" });
    const failed = await Calculation.countDocuments({ user_id, result: "FAIL" });

    const recent = await Calculation.find({ user_id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ total, passed, failed, recent });

  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};

exports.deleteCalculation = async (req, res) => {
  try {
    await Calculation.findByIdAndDelete(req.params.id);
    console.log(req.params.id);
    
    res.json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: "Delete failed"  , err});
  }
};