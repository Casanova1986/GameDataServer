//////// tesst for reg user
// UserRouter.post('/autoRegUser', async (req, res) => {
//     for (let i = req.body.countUser; i > 0; i--) {
//       let userName = req.body.userName + i;
//       await userController.registerUser(userName, req.body.passWord, (err, results) => {
//         if (err) {
//           console.log('Create test err');
//         } else {
//           console.log('Ok');
//         }
//       });
//     }
//     res.send('Done!');
//   });
/////////test for random equipment
// UserRouter.post('/testRandom', async (req, res) => {
//     if ((req.body.chest = 'Common')) {
//       EquipmentModel.find({ equipmentRarity: req.body.chest })
//         .then((data) => {
//           res.send('ok');
//           let randomEquip = Math.round(Math.random() * (data.length - 1));
//           let randomEquipNumSub =
//             Equip_TierList.Common.subStatMin + Math.round(Math.random() * (Equip_TierList.Common.subStatMax - Equip_TierList.Common.subStatMin));
//           console.log('test');
//           let subArray = new Array();
//           while (randomEquipNumSub > 0) {
//             let randomEquipSub = Math.round(Math.random() * (subStatConfig.Common.length - 1));
//             if (subArray.indexOf(randomEquipSub) === -1) {
//               randomEquipNumSub--;
//               subArray.push(randomEquipSub);
//             }
//           }
//           subArray.sort((a, b) => {
//             return a - b;
//           });
//           let equipResult = data[randomEquip];
//           subArray.forEach((e) => equipResult?.subStat.push(subStatConfig.Common[e]));
//           console.log(equipResult);
//         })
//         .catch((err) => res.send(err));
//     }
//   });
/// transion user sign up
// // method use session for create new user
// async registerUser(userName: string, passWord: string, callback: any) {
//   let user = await UserModel.find({ userName: userName });
//   if (user.length) {
//     callback('', 'User exist!');
//   } else {
//     let salt = await bcrypt.genSalt(10);
//     let hashedPassword = await bcrypt.hash(passWord, salt);
//     // random walletID to 15 character
//     let walletID = crypto.randomBytes(15).toString('hex');
//     // // User transacstions for save data
//     const session = await UserModel.startSession();
//     session.startTransaction();
//     try {
//       await UserModel.create(
//         [
//           {
//             userName: userName,
//             passWord: hashedPassword,
//             walletID: walletID,
//           },
//         ],
//         { session }
//       );
//       EquipmentModel.find({ equipmentRarity: 'Common' })
//         .then(async (data) => {
//           if (data) {
//             let randomEquip = Math.round(Math.random() * (data.length - 1));
//             let randomEquipNumSub =
//               Equip_TierList.Common.subStatMin + Math.round(Math.random() * (Equip_TierList.Common.subStatMax - Equip_TierList.Common.subStatMin));
//             let subArray = new Array();
//             while (randomEquipNumSub > 0) {
//               let randomEquipSub = Math.round(Math.random() * (subStatConfig.Common.length - 1));
//               if (subArray.indexOf(randomEquipSub) === -1) {
//                 randomEquipNumSub--;
//                 subArray.push(randomEquipSub);
//               }
//             }
//             subArray.sort((a, b) => {
//               return a - b;
//             });
//             let userInfo = await UserModel.findOne({ userName: userName }, null, { session });
//             let equipResult = data[randomEquip];
//             subArray.forEach((e) => equipResult?.subStat.push(subStatConfig.Common[e]));
//             // random one hero from all heroes
//             heroInfo
//               .find({})
//               .then(async (data) => {
//                 if (data) {
//                   let heroResult = data[Math.floor(Math.random() * data.length)];
//                   await UserInventoryModel.insertMany(
//                     [
//                       {
//                         walletID: walletID,
//                         userId: userInfo,
//                         itemId: Number(equipResult.itemId),
//                         itemType: ItemType.Equip,
//                         isValid: false,
//                         MetaData: equipResult,
//                       },
//                       {
//                         walletID: userInfo?.walletID,
//                         userId: userInfo,
//                         itemId: Number(heroResult.heroId),
//                         itemType: ItemType.Hero,
//                         isValid: false,
//                         MetaData: heroResult,
//                       },
//                     ],
//                     { session }
//                   );
//                   await session.commitTransaction();
//                   session.endSession();
//                   callback('', 'Create User Succeeded');
//                 }
//               })
//               .catch((err) => callback('', 'Create user failed'));
//           }
//         })
//         .catch((err) => callback('', 'Create user failed'));
//     } catch (error) {
//       await session.abortTransaction();
//       session.endSession();
//       console.log(error);
//       callback('', 'Server Err! Create user failed');
//     }
//   }
// }
var list = new Array();
let clear = 8;
let replay = 2;
for (let i = 1; i <= 100; i++) {
    let item = {
        BoxClearRate: 0,
        BoxReplayRate: 0,
        RDG_Clear: clear + 2 * (i - 1),
        RDG_Replay: replay + (i - 1),
    };
    list.push(item);
}
console.log(list);
