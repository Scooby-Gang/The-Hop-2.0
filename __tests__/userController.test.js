import { getUser,createUser } from "../src/server/controllers/userController";
import "regenerator-runtime/runtime";
const db = require("../src/server/models/dataModels");


describe ("testing getUser", ()=> {
    let mockRequest = {};
    let mockResponse = {};
    let nextFunction = jest.fn();
  
    beforeEach(() => {
      mockRequest = {};
      mockResponse = {};
  });  

    afterEach(() => {
        db.query.close();
    })

    

    test("missing username", ()=> {
        mockRequest = {
            params:{
                id:undefined
            },
            body:{
                username:undefined
            }
        }

        getUser(mockRequest,mockResponse,nextFunction);
        
        expect(nextFunction).toHaveBeenCalledWith("Missing username in userController.getUser");
    });

    test("should run next function", async ()=> {
      mockRequest = {
          params:{
              id:jest.fn()
          },
          body:{
            username:jest.fn()
        }
      }
      mockResponse = {
          locals:{
              getUser:{}
          }
      }
      
      await getUser(mockRequest,mockResponse,nextFunction);

      expect(nextFunction).toHaveBeenCalledTimes(0);
    //   expect(nextFunction).toHaveBeenCalledWith("");
    })
})

describe ("testing createUser", ()=> {
    let mockRequest = {};
    let mockResponse = {};
    let nextFunction = jest.fn();
  
    beforeEach(() => {
      mockRequest = {};
      mockResponse = {
          json: jest.fn()
      };
  });

    test("nothing in res.locals.getUser", ()=> {
        mockResponse = {
            locals:{
                getUser:{}
            }
        }

        createUser(mockRequest,mockResponse,nextFunction);
        
        expect(nextFunction).toHaveBeenCalledWith(
            {"log": "Error in userController.createUser", 
            "message": {"err": "This username is already in use."}, 
            "status": 401});
    });

    // test("should run next function", async ()=> {
    // //   mockRequest = {
    // //       params:{
    // //           id:1
    // //       }
    // //   }
      
    //   await getUser(mockRequest,mockResponse,nextFunction);

    //   expect(nextFunction).toHaveBeenCalledTimes(2);
    // })
})