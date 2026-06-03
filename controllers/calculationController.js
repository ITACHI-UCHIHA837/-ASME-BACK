const Calculation = require("../models/Calculation");
const CalculationResult = require("../models/Calresul");

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
    const total = await CalculationResult.countDocuments({ user_id });
    const passed = await CalculationResult.countDocuments({ user_id, "result.Utilization_Ratio": "pass" });
    const failed = await CalculationResult.countDocuments({ user_id, "result.Utilization_Ratio":"fail" });
    const recent = await CalculationResult.find({ user_id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ total, passed, failed, recent });

  } catch (err) {
    res.status(500).json({ message: "Error fetching stats in tha back" + err});
  }
};

// exports.getStats = async (req, res) => {
//   try {
//     const user_id = req.user.user_id;
//     const total = await Calculationa.countDocuments({ user_id });
//     const passed = await Calculation.countDocuments({ user_id, result: "PASS" });
//     const failed = await Calculation.countDocuments({ user_id, result: "FAIL" });

//     const recent = await Calculation.find({ user_id })
//       .sort({ createdAt: -1 })
//       .limit(5);

//     res.json({ total, passed, failed, recent });

//   } catch (err) {
//     res.status(500).json({ message: "Error fetching stats" });
//   }
// };

exports.deleteCalculation = async (req, res) => {
  try {
    await CalculationResult.findByIdAndDelete(req.params.id);
    console.log("DELETING:");
    console.log(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: "Delete failed"  , err});
  }
};


// exports.deleteCalculation = async (req, res) => {
//   try {
//     await Calculation.findByIdAndDelete(req.params.id);
//     console.log(req.params.id);
    
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     console.log(err);
    
//     res.status(500).json({ message: "Delete failed"  , err});
//   }
// };
// exports.Calculating = async (req, res) => {
//   try {
//    // const user_id = req.user.user_id;
//     const {  
//        size,
//         grade,
//         class_id,
//         pressure,
//         CA,
//         menufecture,
//         consi_wall_thik,
//         projname,
//         temp,
//         ambi_temp,
//         install_temp,
//         desi_temp,
//         desi_mini_temp,
//         fil_ban_rad,
//         els_ban_rad,
//         dia_to_wal
//   } = req.body.payload;
//   const ress = {
//     //  tmin : size+grade,
//      tmi : pressure*size/(20*grade*class_id*menufecture*1)
//   }
//     // tminca
//     // t
//     // d_t_actual
//      const arrivedata = { 
//        size,
//         grade,
//         class_id,
//         pressure,
//         CA,
//         menufecture,
//         consi_wall_thik,
//         projname,
//         temp,
//         ambi_temp,
//         install_temp,
//         desi_temp,
//         desi_mini_temp,
//         fil_ban_rad,
//         els_ban_rad,
//         dia_to_wal
//     }
// console.log(arrivedata);
//     res.json(ress)
//   } catch (err) {   
//     console.log(err +"back error");
//     res.status(500).json({err});
//   }
// };




exports.saveCalculation = async (req, res) => {
  try {
     console.log(req.body);
      const calcres = new CalculationResult({
          user_id: req.user.user_id,
          payload: req.body.payload,
          projname: req.body.payload.projname,
          result: req.body.resultload,
    });
    await calcres.save();
    res.json(calcres);

  }

    catch (err) {
    console.log(err); 
    }
  }

  