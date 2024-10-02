import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { Role } from "./enums/role.enum";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }
  //Tạo data mẫu
  async onModuleInit() {
    const users = await this.userModel.find().exec();

    if (users.length === 0) {
      const defaultPassword = await bcrypt.hash("123456", 10);
      await this.userModel.create([
        {
          name: 'ShelterStaff',
          email: 'ShelterStaff@gmail.com',
          password: defaultPassword,
          role: [Role.SHELTER_STAFF]
        },
        {
          name: 'Admin',
          email: 'Admin@gmail.com',
          password: defaultPassword,
          role: [Role.ADMIN]
        },
      ]);
      console.log('Sample users created!');
    } else {
      console.log('Sample data already exists.');
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, role } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid email or password");
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
