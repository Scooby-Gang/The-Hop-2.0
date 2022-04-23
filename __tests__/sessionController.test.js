import "regenerator-runtime/runtime";
import { verifyUser} from "../src/server/controllers/sessionController";

describe ("testing verifyUser", ()=> {
    let mockRequest = {};
    let mockResponse = {};
    let nextFunction = jest.fn();
  
    beforeEach(() => {
      mockRequest = {};
      mockResponse = {};
  });  

    // afterEach(() => {
    //     db.query.close();
    // })


    test ("testing verify User", () => {
        mockResponse = {
            local:{
                getUser: {}
            }
        }
        verifyUser(mockRequest,mockResponse,nextFunction)

        expect()
    })
})

